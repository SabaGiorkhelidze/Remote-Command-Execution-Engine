import Docker from "dockerode";

export async function ensureImage(docker: Docker, image: string): Promise<void> {
  try {
    
    await docker.getImage(image).inspect()
    console.log(`Image ${image} already exists locally.`);
    return;
  } catch (err: any) {
    
    if (err.statusCode !== 404) throw err;
  }

  console.log(`image ${image} does not exist locally. Pulling from registry...`);

  await new Promise<void>((resolve, reject) => {
    docker.pull(image, (err: any, stream: any) => {
        if (err) reject(err)

        docker.modem.followProgress(stream, (finishErr) => {
            if (finishErr) reject(finishErr)

            console.log('image pulled successfully')
            resolve()
        })
    })
  })
}
