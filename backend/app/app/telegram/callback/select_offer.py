from .callback import Callback

class SelectOfferCallback(Callback):
    def __init__(self, offer_id) -> None:
        super().__init__("so", { "offer_id": offer_id })
