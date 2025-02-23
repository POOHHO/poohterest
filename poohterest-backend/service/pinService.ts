import Pin from "#models/pin";

export default class PinService {

  public static async createPin(data: { title: string; description: string; image_url: string; user_id: number }) {
    const pin = await Pin.create(data)
    return pin
  }

  public static async getAllPins() {
    const pins = await Pin.query().preload('user')
    return pins
  }

  public static async getPinById(pinId: number) {
    const pin = await Pin.findOrFail(pinId)
    await pin.load('user')
    return pin
  }
  
}
