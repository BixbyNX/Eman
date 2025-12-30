import React from 'react';

const ContactPopup = ({ onClose }) => {
  const contact = {
    name: 'Jose Emmanuel M. Junio',
    email: 'josemjunio11@gmail.com',
    phone: '0961 534 5542',
  };

  return (
    <div className="relative w-full h-full p-10 overflow-y-auto font-robotoCondensed flex justify-center items-center">
      <button onClick={onClose} className="absolute right-4 top-4 z-50 text-xl opacity-70 hover:opacity-100 p-2 transition-opacity" >✕</button>

      <div className="w-full max-w-sm p-8 text-center flex flex-col items-center">
        <div className="mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500">
            J
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-1">{contact.name}</h2>
        <p href={`mailto:${contact.email}`} className="text-md text-gray-600 mb-2">{contact.email}</p>
        <p href={`tel:${contact.phone}`} className="text-md text-gray-600">{contact.phone}</p>
        
      </div>
    </div>
  );
};

export default ContactPopup;
