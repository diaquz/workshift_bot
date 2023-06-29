from .callback import Callback

class SelectEventCallback(Callback):
    name = "so"

    def __init__(self, event_id) -> None:
        super().__init__(SelectEventCallback.name, { "event_id": event_id })

    @staticmethod
    def from_list(atr):
        return SelectEventCallback(atr[1])
    