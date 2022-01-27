import React from "react";


// components


import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views
import Signin from 'views/auth/Signin';
import Register from 'views/auth/Register';




export default function Auth() {

  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>

      <main>
      
        <section className="relative w-full h-full py-40 min-h-screen">
        
          <div
            className="absolute top-0 w-full h-full bg-blueGray-600 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          >

            <>
            <Navbar/>
              <div className="flex flex-wrap mt-16">
                <div className="w-full">
                  <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                  >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                          (openTab === 1
                            ? "text-white bg-lightBlue-600"
                            : "text-lightBlue-600 bg-white")
                        }
                        onClick={e => {
                          e.preventDefault();
                          setOpenTab(1);
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                      >
                        Sign-in
                      </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                          (openTab === 2
                            ? "text-white bg-lightBlue-600"
                            : "text-lightBlue-600 bg-white")
                        }
                        onClick={e => {
                          e.preventDefault();
                          setOpenTab(2);
                        }}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                      >
                        Sign-up
                      </a>
                    </li>

                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="px-4 py-5 flex-auto bg-blueGray-600"
                     style={{
                      backgroundImage:
                        "url(" + require("assets/img/register_bg_2.png").default + ")",
                    }}>
                      <div className="tab-content tab-space ">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                          <Signin setOpenTab={setOpenTab}/>

                        </div>

                        

                      </div>
                      <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                          <Register setOpenTab={setOpenTab}/>

                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </>

 </div>
          
        </section>
        <FooterSmall absolute />
      </main>
      </>
  );
}
