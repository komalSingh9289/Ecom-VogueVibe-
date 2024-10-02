import React from 'react'

const AboutUs = () => {
  return (
    <section className='w-screen h-screen mt-1 bg-white p-5'>
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            We are committed to providing you with the best online shopping experience.
          </p>
        </header>
        <article className='text-center'>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2">Customer Satisfaction: Your happiness is our top priority.</li>
            <li className="mb-2">Quality: We ensure every product meets our rigorous quality standards.</li>
            <li className="mb-2">Integrity: We value transparency and honesty in all our dealings.</li>
            <li className="mb-2">Innovation: We continuously strive to bring you the latest and greatest products.</li>
          </ul>
        </article>
    </section>
  )
}

export default AboutUs