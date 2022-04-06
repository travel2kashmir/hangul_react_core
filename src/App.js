import './styles/index.css'
import './styles/tailwind.css'

function App() {
  return (
    <div className='bg-gray-50'>
    <div className="mx-auto md:h-screen flex flex-col justify-center items-center 
    px-6 pt-8 mb-4 pt:mt-0">
    
   
        <span className="self-center text-3xl  mb-8 mt-6 tracking-normal font-bold
         text-gray-700 whitespace-nowrap">Hangul</span> 
    
   
    <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
        <div className="p-4 sm:p-8 lg:p-16 space-y-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-700">
                Sign in 
            </h2>
            
            <form className="mt-8 space-y-6" action="#">
                <div>
                  <label for="email" className="text-base font-semibold
                     text-gray-700 
                    block mb-2">Your email</label>
                    <input type="email" name="email" id="email" 
                    className="bg-gray-50 border border-gray-300 
                    text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600
                     focus:border-cyan-600 block w-full p-2.5" placeholder="" required>
               </input>
                </div>
                <div>
                    <label for="password" className="text-base font-semibold
                     text-gray-700 block mb-2">Your password</label>
                    <input type="password" name="password" id="password" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required>
                    </input>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember"
                     name="remember" type="checkbox" class="bg-gray-50 
                     border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4
                      rounded" required/>
                   
                    </div>
                    <div class="text-sm ml-3">
                    <label for="remember" className="text-sm font-semibold text-gray-700">Remember me</label>
                    </div>
                    <a href="#" className="text-sm font-semibold
                     text-teal-500 hover:underline  ml-auto">Lost Password?</a>
                </div>
                <button type="submit" className="font-semibold text-white bg-cyan-600 
                hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 
                rounded-lg text-base px-5 py-2 w-full sm:w-auto text-center">Sign in</button>
                <div className="text-base font-semibold text-gray-500">
                    Not registered?
                      <a  href="#" className="text-teal-500 hover:underline px-2">Create account</a>
                    
                </div>
            </form>
        </div>
    </div>
</div>

</div> 
  );
}

export default App;
