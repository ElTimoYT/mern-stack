

function Home() {
  return (
    <div
      className="
        min-h-screen             
        bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200 
        text-gray-800           
        font-sans               
        flex flex-col items-center justify-center 
        p-4                     
      "
    >
      <div
        className="
          home-card
          bg-white              
          rounded-2xl           
          shadow-2xl            
          p-8                   
          md:p-12               
          max-w-md              
          w-full                
          text-center           
          transform             
          hover:scale-105       
          transition-all duration-300 ease-in-out 
          mb-8                  
        "
      >
        <h1
          className="
            text-4xl              
            md:text-5xl           
            font-extrabold       
            text-transparent      
            bg-clip-text          
            bg-gradient-to-r from-blue-600 to-indigo-700 
            mb-6                  
            tracking-tight        
          "
        >
          🚀 User App
        </h1>

        <p
          className="
            text-lg               
            md:text-xl            
            leading-relaxed       
            text-gray-600         
          "
        >
          Welcome to the User App! Create, view, update, and manage users with ease.
        </p>

        {/* Podrías añadir un botón aquí, por ejemplo: */}
        <button
          className="
            mt-8                  
            px-8 py-3             
            bg-gradient-to-r from-purple-600 to-indigo-600 
            text-white            
            font-bold             
            rounded-full          
            shadow-lg             
            hover:shadow-xl       
            transform hover:-translate-y-1 
            transition-all duration-300 ease-in-out 
            focus:outline-none focus:ring-4 focus:ring-purple-300 
          "
        >
          Get Started
        </button>

      </div>

      <footer
        className="
          home-footer
          text-gray-500           
          text-sm                 
          mt-auto                 
          p-4                     
        "
      >
        Made with ❤️ using React and Tailwind CSS
      </footer>
    </div>
  );
}

export default Home;