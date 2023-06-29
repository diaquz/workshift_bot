const Levels = {
    labels: ["Новичок", "Продвинутый", "Эксперт", "Мастер"],
    name: (value) => Levels.labels[value]
};

const EventTypes = {
    labels: ["Рабочая смена", "Болезнь", "Общее", "Другое"],
    name: (value) => EventTypes.labels[value],
    Workshift: 0,
    Illness: 1,
    Global: 2,
    Other: 3
};

const Privilage = {
    labels: ["Пользователь", "Модератор", "Администратор"],
    name: (value) => Privilage.labels[value],
    User: 0,
    Moderator: 1,
    Admin: 2
};

export { Levels, EventTypes, Privilage };
