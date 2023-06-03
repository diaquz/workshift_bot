from aiogram import types
from aiogram.utils.callback_data import CallbackData
from contextlib import closing
from logging import getLogger

from app.api.deps import get_db
from app import repository 
from app.model.event import EventType
from app import schemas

from app.telegram import dp, bot
from app.telegram.utils.markup import delete_keyboard
from app.telegram.utils.time_utils import parse_date
from app.telegram.utils.format import format_events, event_markup, answers_markup, offers_markup, accept_offer_markup
from datetime import timedelta


logger = getLogger('telegram')
select_event = CallbackData("select_user_event", "id")
select_answer = CallbackData("select_answer", "id")
select_offer = CallbackData("select_offer", "id")
delete_offer = CallbackData("delete_offer", "id")
delete_answer = CallbackData("delete_answer", "id")

accept_offer = CallbackData("accept_offer", "offer_id", "id")
next_offers = CallbackData("next_offers", "offset")

@dp.message_handler(commands=["schedule"])
async def cmd_schedule(message: types.Message):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=message.from_user.id)
        if user:
            date = parse_date(message.text)
            end_date = date + timedelta(days=7)
            
            events = repository.event.get_for_user(db, id=user.id, start_date=date, end_date=end_date) # type: ignore

            if events and len(events) > 0:
                await message.reply(format_events(events), parse_mode="MarkdownV2")    
            else:
                await message.reply("О нет, ничего не нашлось 	／人◕ ‿‿ ◕人＼")    


@dp.message_handler(commands=["select"])
async def cmd_select(message: types.Message):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=message.from_user.id)
        if user:
            date = parse_date(message.text)
            end_date = date + timedelta(days=7)

            events = repository.event.get_by_date_and_type(db, id=user.id, start_date=date, end_date=end_date, type=EventType.Workshift) # type: ignore

            if events and len(events) > 0:
                await message.reply("Выберите событие", reply_markup=event_markup(events, select_event), parse_mode="MarkdownV2")
            else:
                await message.reply("Пусто..")   


@dp.callback_query_handler(select_event.filter())
async def select_event_answer(query: types.CallbackQuery, callback_data: dict):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=query.from_user.id)
        offer = repository.offer.get_by_workshift(db, id=callback_data['id'])

        if user and offer is None:

            obj_in = schemas.OfferCreate(
                workshift_id=callback_data['id'],
                publisher_id=user.id # type: ignore
            )

            offer = repository.offer.create(db, obj_in=obj_in)

            await delete_keyboard(query)
            await query.message.reply("Предложение обмена создано 0__.__0")
        
        else:
            await query.message.reply("Не удалось создать предложение обмена")


@dp.message_handler(commands=["answers"])
async def cmd_answer(message: types.Message):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=message.from_user.id) 

        if user:
            answers = repository.answer.get_answer_to_user(db, id=user.id) # type: ignore

            if answers and len(answers) > 0:

                await message.reply("Список ответов", reply_markup=answers_markup(answers, select_answer), parse_mode="MarkdownV2")
            else:
                await message.reply("Нет найденных ответов")


@dp.callback_query_handler(select_answer.filter())
async def select_answer_choice(query: types.CallbackQuery, callback_data: dict):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=query.from_user.id)
        answer = repository.answer.get(db, id=callback_data["id"])

        if user and answer:
            result = repository.answer.accept(db, id=answer.id) # type: ignore

            if result:
                await query.message.reply("Ответ принят 0__.__0")
            else:
                await query.message.reply("Не удалось принять ответ")

            
        await delete_keyboard(query)


@dp.message_handler(commands=["offers"])
async def cmd_offers(message: types.Message):
     with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=message.from_user.id) 

        if user:
            offers = repository.offer.get_by_level(db, user.level, user.id, 0, 10) # type: ignore

            if offers and len(offers) > 0:
                markup = offers_markup(offers, select_offer)
                markup.add(types.InlineKeyboardButton("<", callback_data=next_offers.new(offset=0))) #type: ignore
                markup.add(types.InlineKeyboardButton("<", callback_data=next_offers.new(offset=10))) #type: ignore

                await message.reply("Выберите предложение", reply_markup=markup)

            else:
                await message.reply("Нет найденных предложений") 


@dp.callback_query_handler(next_offers.filter())
async def next_offers_list(query: types.CallbackQuery, callback_data: dict):
    with closing(get_db()) as session:
        db = next(session)
        offset = callback_data["offset"]

        user = repository.user.get_by_telegram(db, id=query.from_user.id)

        if user:
            offers = repository.offer.get_by_level(db, user.level, user.id, offset, 10)

            if offers and len(offers) > 0:
                    markup = offers_markup(offers, select_offer)
                    markup.add(types.InlineKeyboardButton("<", callback_data=next_offers.new(offset=max(offset-10, 0)))) #type: ignore
                    markup.add(types.InlineKeyboardButton("<", callback_data=next_offers.new(offset=offset+10))) #type: ignore

                    await query.message.edit_reply_markup(markup)


@dp.callback_query_handler(select_offer.filter())
async def select_offer_list(query: types.CallbackQuery, callback_data: dict):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=query.from_user.id)
        offer = repository.offer.get(db, id=callback_data["id"])

        if user and offer:
            date = parse_date("")
            end_date = date + timedelta(days=14)
            
            events = repository.event.get_by_date_and_type(db, user.id, date, end_date, EventType.Workshift) #type: ignore

            await query.message.reply("Выбери ответное предложение", reply_markup=accept_offer_markup(events, accept_offer, id=callback_data["id"]))
            await delete_keyboard(query)


@dp.callback_query_handler(accept_offer.filter())
async def accept_offer_choice(query: types.CallbackQuery, callback_data: dict):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=query.from_user.id)
        offer = repository.offer.get(db, id=callback_data["offer_id"])
        event = repository.event.get(db, id=callback_data["event_id"])

        if user and offer and event:
            obj_in = schemas.AnswerCreate(
                offer_id=offer.id, #type: ignore
                workshift_id=event.id, #type: ignore
                user_id=user.idv #type: ignore
            )

            answer = repository.answer.create(db, obj_in=obj_in)
            if answer:
                await query.message.reply("Ответ успешно создан 0__.__0 (это типа крыса)")

            else:
                await query.message.reply("Не удалось создать ответ")

            await delete_keyboard(query)




@dp.message_handler(commands=["my-offers"])
async def cmd_my_offers(message: types.Message):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=message.from_user.id)
        if user:
            offers = repository.offer.get_user_offers(db, id=user.id) #type: ignore

            if offers and len(offers) > 0:
               await message.reply("Список твоих предложений", reply_markup=offers_markup(offers, delete_offer))

            else:
                await message.reply("Ничегошеньки тут нет")


@dp.callback_query_handler(delete_offer.filter())
async def delete_offer_choice(query: types.CallbackQuery, callback_data: dict):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=query.from_user.id)

        if user:
            offer = repository.offer.remove(db, id=callback_data["id"])

            if offer:
                await query.message.reply("Предложение удалено")
            else:
                await query.message.reply("Не удалось удалить предложение")

            await delete_keyboard(query)


@dp.message_handler(commands=["my-answers"])
async def cmd_my_answers(message: types.Message):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=message.from_user.id)
        if user:
            answers = repository.answer.get_user_answers(db, id=user.id)

            if answers and len(answers) > 0:
                await message.reply("Твои ответы", reply_markup=answers_markup(answers, delete_answer))
            else:
                await message.reply("Ответов не найдено")


@dp.callback_query_handler(delete_answer.filter())
async def delete_answer_cmd(query: types.CallbackQuery, callback_data: dict):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=query.from_user.id)
        if user:
            answer = repository.answer.remove(db, id = callback_data["id"])

            if answer:
                await query.message.answer("Ответ удален")
            else:
                await query.message.answer("Не удалось удалить ответ")

            await delete_keyboard(query)


@dp.message_handler(commands=["feedback"])
async def cmd_feedback(message: types.Message):
    with closing(get_db()) as session:
        db = next(session)
        payload = message.text.replace("/feedback", "")

        user = repository.user.get_by_telegram(db, id=message.from_user.id)
        if user:
            obj_in = schemas.FeedbackCreate(
                user_id=user.id, #type: ignore
                title=payload[0:15],
                message=payload
            )

            feedback = repository.feedback.create(db, obj_in=obj_in)

            if feedback:
                await message.reply("Сообщение отправлено 0__.__0")
            else:
                await message.reply("Не удалось отправить сообщение")
