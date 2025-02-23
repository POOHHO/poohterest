import type { HttpContext } from '@adonisjs/core/http'
import PinService from '../../service/pinService.js'
import app from '@adonisjs/core/services/app'
import Pin from "#models/pin";

export default class PinsController {

  public async index({ response }: HttpContext) {
    const pins = await PinService.getAllPins();

    const randomizedPins = this.shuffleArray(pins);

    return response.ok({ pins: randomizedPins });
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public async showbyuser({ auth, response, bouncer }: HttpContext) {

    const user = auth.getUserOrFail()

    await bouncer.with("PinPolicy").authorize('index')

    const pins = await user.related('pins').query()

    return response.ok({ pins })
  }

  public async store({ request, auth, response, bouncer }: HttpContext) {
    const user = auth.getUserOrFail()

    await bouncer.with("PinPolicy").authorize('store')

    const data = request.only(['title', 'description']);

    const image = request.file('image', {
      extnames: ['jpg', 'png', 'jpeg'],
      size: '2mb',
    });

    if (!image) {
      return response.badRequest({ message: 'Please upload an image.' });
    }

    if (!image.isValid) {
      return response.badRequest(image.errors);
    }

    const fileName = `${new Date().getTime()}.${image.extname}`;
    await image.move(app.makePath('public/uploads'), {
      name: fileName,
      overwrite: true,
    });

    const imageUrl = `/uploads/${fileName}`;
    const pin = await PinService.createPin({ ...data, user_id: user.id, image_url: imageUrl });

    return response.created({ pin });
  }

  public async show({ params, response }: HttpContext) {
    try {
      const pin = await PinService.getPinById(params.id)
      return response.ok({ pin })
    } catch {
      return response.notFound('Pin not found')
    }
  }

  public async destroy({ params, response, bouncer }: HttpContext) {
    try {
      const pin = await Pin.findOrFail(params.id);

      await bouncer.with("PinPolicy").authorize("destroy", pin);

      await pin.delete();

      return response.ok({ message: "Pin deleted successfully" });
    } catch (error) {

      return response.badRequest({ error: error.message });
    }
  }

}
