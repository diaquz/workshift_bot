from .callback import Callback

class RegisterCallback(Callback):
    name = "re"

    def __init__(self, name, level) -> None:
        super().__init__(RegisterCallback.name, { "name": name, "level": level })

    @staticmethod
    def from_list(atr):
        return RegisterCallback(atr[1], atr[2])