import React from 'react';

const CertificationsPopup = ({ onClose }) => {
  return (
    <div className="relative w-full h-full p-10 overflow-y-auto font-robotoCondensed">
      <button onClick={onClose} className="absolute right-4 top-4 z-50 text-xl opacity-70 hover:opacity-100 p-2 transition-opacity" >✕</button>

      <div className="flex justify-center items-start min-h-[80vh]">
        <div className="flex flex-col gap-6 w-full max-w-xl ">

          <div className="relative min-h-[180px] rounded-lg border border-gray-300 shadow-sm p-6 flex flex-col justify-center text-center bg-cover bg-center"
            style={{ backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Seal_of_the_Armed_Forces_of_the_Philippines.svg/1659px-Seal_of_the_Armed_Forces_of_the_Philippines.svg.png')",
            }} >
            <div className="absolute inset-0 bg-white/80 rounded-lg"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold mb-2">On the Job Training</h3>
              <p className="text-xl opacity-80">Armed Forces of the Philippines</p>
              <p className="text-xl mt-1 font-medium">2024</p>
            </div>
          </div>
          
          <div className="relative min-h-[180px] rounded-lg border border-gray-300 shadow-sm p-6 flex flex-col justify-center text-center bg-cover bg-center"
            style={{ backgroundImage:
                "url('https://www.aimbetter.com/wp-content/uploads/2019/02/SAP-B1-Logo1.png')",
            }} >
            <div className="absolute inset-0 bg-white/80 rounded-lg"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold mb-2">SAP Business One</h3>
              <p className="text-xl opacity-80">STI College Cubao</p>
              <p className="text-xl mt-1 font-medium">2023</p>
            </div>
          </div>

          <div className="relative min-h-[180px] rounded-lg border border-gray-300 shadow-sm p-6 flex flex-col justify-center text-center bg-cover bg-center"
            style={{ backgroundImage:
                "url('https://thetechblock.com/wp-content/uploads/2021/02/oracle-database-logo.png')",
            }} >
            <div className="absolute inset-0 bg-white/80 rounded-lg"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-semibold mb-2">
                Database Foundations – Oracle
              </h3>
              <p className="text-xl opacity-80">STI College Cubao</p>
              <p className="text-xl mt-1 font-medium">2022</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CertificationsPopup;
