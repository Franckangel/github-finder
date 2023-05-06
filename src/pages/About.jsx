
function About() {
  return (
    <>
      <h1 className="text-6xl mb-4">Github Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. This
        project is realised by {' '}
        <strong>
          <a href='https://www.linkedin.com/in/franck-djatcha-b2a74a23a/'>
            Djatcha Franck
          </a>
        </strong>
        .
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-white'>1.0.0</span>
      </p>
      <p className='text-lg text-gray-400'>
        Deployed on:
          Saturday, 6 May 2023
      </p>
    </>
  )
}

export default About
