import React from 'react';

const SplashScreen = () => {
   return (
     <div className="h-[100vh] flex w-full ">
       <div
         className="m-auto  animate-bounce
      flex rounded-lg p-10 bg-black"
       >
         <h1 className="text-white">Loading darkness ...</h1>
       </div>
     </div>
   );
};

export default SplashScreen;