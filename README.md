This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

On first start run:

```bash
#install all dependecies
npm run install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deployment

To provide easy virtualization the project is dockerized. After changes in the source code you need to build a new [Docker Image](https://docs.docker.com/engine/reference/commandline/build/).

1. Run this command in the project directory to build the Docker Image

```bash
docker build -t justuskl/revit_converter:latest .
```

2. Run this command to push the Docker Image to [Dockerhub](https://hub.docker.com/r/justuskl/revit_converter)

```bash
docker push justuskl/revit_converter:latest
```

3. Log into the server via SSH and provide the password

```bash
ssh bsu@192.168.2.200
```

4. Update Docker Image

```bash
sudo docker-compose down
sudo docker-compose up
```

Server should restart and pull new Docker Image from Dockerhub.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
