import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
      </Head>
      <main className="min-h-screen bg-gray-100 text-center p-8">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to My Portfolio</h1>
        <p className="mt-4 text-gray-700">Built with Next.js and Tailwind CSS 3.2.1</p>
        <img
          src="/portfolio/images/profile.jpg"
          alt="Profile"
          className="w-40 h-40 mx-auto mt-6 rounded-full shadow-lg"
        />
      </main>
    </>
  );
}
