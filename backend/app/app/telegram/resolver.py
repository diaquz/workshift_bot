from app import repository
from app.telegram.handlers import user, query, base
from app.telegram.callback import Callback, SelectEventCallback, RegisterCallback

class Resolver:

    def __init__(self) -> None:
        self.handlers = {}
        self.query = {}
        self.default = lambda db, message: None

    async def resolve(self, db, update):
        if "callback_query" in update:
            await self.resolve_callback(db, update["callback_query"])
        elif "message" in update:
            await self.resolve_message(db, update["message"])

    async def resolve_callback(self, db, query):
        data_raw = query["data"]
        data = Callback.unpack(data_raw)

        callback = self.query.get(data[0])
        if callback:
            query, handler = callback

            handler(db, query.from_list(data).data)

    async def resolve_message(self, db, message):
        text = message.get("text")

        if text:
            command = text.split()[0]
            handler = self.handlers.get(command)

            if handler:
                handler(db, message)
            else:
                self.default(db, message)

    def get_message_data(self, message: dict):
        return message.get('from'), message.get('chat'), message.get('text')

    def register(self, command, handler):
        self.handlers[command] = handler

    def register_callback(self, query, handler):
        self.query[query] = handler

    def remove(self, handler):
        pass

resolver = Resolver()

resolver.default = base.cmd_default # type: ignore
resolver.register("/start", base.cmd_start)
resolver.register("/schedule", user.cmd_schedule)
resolver.register("/select", user.cmd_select)

resolver.register_callback(RegisterCallback.name, { RegisterCallback, query.handle_register })
resolver.register_callback(SelectEventCallback.name, { SelectEventCallback, query.handle_select_event })
