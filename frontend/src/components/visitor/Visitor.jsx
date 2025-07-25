import React, { useState } from 'react';

const generateId = (() => {
    let count = 0;
    return () => ++count;
})();

const PersonForm = ({ index, onDelete }) => (
    <div className='form flex flex-col items-center justify-center h-full'>
        <div className='bg-gray-800 w-[90%] md:w-[50%] p-6 rounded-lg shadow-lg'>

            <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor={`name-${index}`}>Name</label>
                <input className='w-full p-2 bg-gray-700 text-white rounded outline-none focus:bg-[#37415180]' type='text' id={`name-${index}`} placeholder='Enter your name' />
            </div>
            <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor={`age-${index}`}>Age</label>
                <input className='w-full p-2 bg-gray-700 text-white rounded outline-none focus:bg-[#37415180]' type='text' id={`age-${index}`} placeholder='Enter your age' />
            </div>
            <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor={`phone-${index}`}>Phone No.</label>
                <input className='w-full p-2 bg-gray-700 text-white rounded outline-none focus:bg-[#37415180]' type='text' id={`phone-${index}`} placeholder='Enter your phone number' />
            </div>
            <div className='mb-4'>
                <label className='block text-white mb-2' htmlFor={`purpose-${index}`}>Purpose of Visit</label>
                <input className='w-full p-2 bg-gray-700 text-white rounded outline-none focus:bg-[#37415180]' type='text' id={`purpose-${index}`} placeholder='Enter purpose of visit' />
            </div>
            {/* ...purpose buttons... */}
            <div className='flex items-center justify-center mb-2 mt-[-8px]'>
                <span className='text-blue-400 text-xl'>ⓘ</span>
                <p className='text-slate-400 text-sm text-center'>
                    Write your own purpose or select a purpose from below
                </p>
            </div>
            <div className='mb-4'>
                <button className='w-fit px-1 mx-1 my-1 bg-[#77bd3eb0] hover:bg-lime-600 text-white text-[16px] font-normal rounded focus:outline-none focus:shadow-outline' type='button'>Admission purpose</button>
                <button className='w-fit px-1 mx-1 my-1 bg-[#77bd3eb0] hover:bg-lime-600 text-white text-[16px] font-normal rounded focus:outline-none focus:shadow-outline' type='button'>Fees</button>
                <button className='w-fit px-1 mx-1 my-1 bg-[#77bd3eb0] hover:bg-lime-600 text-white text-[16px] font-normal rounded focus:outline-none focus:shadow-outline' type='button'>Parent Meeting</button>
                <button className='w-fit px-1 mx-1 my-1 bg-[#77bd3eb0] hover:bg-lime-600 text-white text-[16px] font-normal rounded focus:outline-none focus:shadow-outline' type='button'>Normal visit</button>
            </div>
            <button onClick={onDelete} className='flex items-center justify-center w-full bg-red-500 active:bg-red-600 active:scale-95 transition-all text-white font-bold py-[2px] px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
                <span className="text-3xl px-3 bg-yellow-00 pb-1">⛌</span> Remove Person
            </button>
        </div>
    </div>
);

const Visitor = () => {
    const [noOfForms, setNoOfForms] = useState([{ id: generateId() }]);

    const addPerson = () => {
        setNoOfForms([...noOfForms, { id: generateId() }]);
    };

    const deletePerson = (idToRemove) => {
        setNoOfForms(noOfForms.filter(form => form.id !== idToRemove));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <header className="sticky top-0 z-20 bg-gray-950 w-full border-b border-lime-500 flex items-center justify-start">
                <h1 className="text-2xl text-white font-semibold pl-3 py-3">
                    Hello <span className="font-bold">Visitor</span> 👋
                </h1>
            </header>

            <main className="flex-1 overflow-y-auto w-full flex flex-col items-center px-2 pb-28">
                <div className="bg-gray-800 w-full max-w-xl rounded-md mt-3 mb-4 shadow">
                    <p className="text-lg text-slate-200 font-medium px-4 py-4">Please fill the form to visit🙏</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xl">
                    {noOfForms.map((form, index) => (
                        <PersonForm
                            key={form.id}
                            index={index}
                            onDelete={() => deletePerson(form.id)}
                        />
                    ))}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 w-full bg-gray-950 flex justify-center p-2 z-30 border-t border-lime-500">
                <div className="flex gap-2 w-full max-w-xl mx-auto justify-start">
                    <button onClick={addPerson} className="w-fit flex items-center gap-1 bg-lime-500 active:bg-lime-600 text-white text-sm font-semibold py- px-3 rounded-md shadow transition-all duration-150" type="button">
                        <span className="hidden sm:inline">Add person</span>
                        <div className="flex sm:hidden px-1 text-xl"><div className="pr-2">+</div>Add</div>
                    </button>
                    <button className="w-full flex items-center justify-center bg-purple-500 active:bg-purple-600 active:scale-95 text-white text-lg font-semibold py-2 px-4 rounded-md shadow transition-all duration-150" type="submit">
                        Submit
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Visitor;