import path from 'path'
import _ from 'lodash'
import GIFEncoder from 'gifencoder'
import Canvas from 'canvas'

const Frames = 10

const GifCache = []

const DefaultOptions = {
    resolution: 128,
    delay: 20,
    backgroundColor: null,
}

export async function PetImage(Avatar, Props = {}) {

    Props = _.defaults(Props, DefaultOptions)

    const Encoder = new GIFEncoder(Props.resolution, Props.resolution)

    Encoder.start()
    Encoder.setRepeat(0)
    Encoder.setDelay(Props.delay)
    Encoder.setTransparent()

    const canvas = Canvas.createCanvas(Props.resolution, Props.resolution)
    const ctx = canvas.getContext('2d')

    const image = await Canvas.loadImage(Avatar)

    for (let i = 0; i < Frames; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (Props.backgroundColor) {
            ctx.fillStyle = Props.backgroundColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        const j = i < Frames / 2 ? i : Frames - i

        const width = 0.8 + j * 0.02
        const height = 0.8 - j * 0.05
        const offsetX = (1 - width) * 0.5 + 0.1
        const offsetY = (1 - height) - 0.08

        if (i == GifCache.length) {

            GifCache.push(
                await Canvas.loadImage(path.resolve(process.cwd(), `img/pet${i}.gif`))
            )
        }

        ctx.drawImage(image, Props.resolution * offsetX, Props.resolution * offsetY, Props.resolution * width, Props.resolution * height)
        ctx.drawImage(GifCache[i], 0, 0, Props.resolution, Props.resolution)

        Encoder.addFrame(ctx)
    }

    Encoder.finish()
    return Encoder.out.getData()
}