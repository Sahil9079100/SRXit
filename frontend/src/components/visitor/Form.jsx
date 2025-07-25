const Form = () => {

    const deletePerson = ()=>{
        
    }
    return (
        <>
            <div className='form flex flex-col items-center justify-center h-full'>
                <div className='bg-gray-800 w-[90%] md:w-[50%] p-6 rounded-lg shadow-lg'>
                    <div className='mb-4'>
                        <label className='block text-white mb-2' htmlFor='name'>Name</label>
                        <input className='w-full p-2 bg-gray-700 text-white rounded outline-none focus:bg-[#37415180]' type='text' id='name' placeholder='Enter your name' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white mb-2' htmlFor='email'>Age</label>
                        <input className='w-full p-2 bg-gray-700 text-white rounded outline-none focus:bg-[#37415180]' type='email' id='email' placeholder='Enter your age' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white mb-2' htmlFor='email'>Phone No.</label>
                        <input className='w-full p-2 bg-gray-700 text-white rounded outline-none focus:bg-[#37415180]' type='email' id='email' placeholder='Enter your phone number' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white mb-2' htmlFor='purpose'>Purpose of Visit</label>
                        <input className='w-full p-2 bg-gray-700 text-white rounded outline-none focus:bg-[#37415180]' type='text' id='purpose' placeholder='Enter purpose of visit' />
                    </div>

                    <div className='flex items-center justify-center mb-2 mt-[-8px]'>
                        <span className='text-blue-400 text-xl'>ⓘ</span>
                        <p className='text-slate-400 text-sm text-center'>
                            Write your own purpose or select a purpose from below
                        </p>
                    </div>
                    <div className='mb-4'>
                        <button className='w-fit px-1 mx-1 my-1 bg-[#77bd3eb0] hover:bg-lime-600 text-white text-[16px] font-normal rounded focus:outline-none focus:shadow-outline' type='submit'>Admission purpose</button>
                        <button className='w-fit px-1 mx-1 my-1 bg-[#77bd3eb0] hover:bg-lime-600 text-white text-[16px] font-normal rounded focus:outline-none focus:shadow-outline' type='submit'>Fees</button>
                        <button className='w-fit px-1 mx-1 my-1 bg-[#77bd3eb0] hover:bg-lime-600 text-white text-[16px] font-normal rounded focus:outline-none focus:shadow-outline' type='submit'>Parent Metting</button>
                        <button className='w-fit px-1 mx-1 my-1 bg-[#77bd3eb0] hover:bg-lime-600 text-white text-[16px] font-normal rounded focus:outline-none focus:shadow-outline' type='submit'>Normal visit</button>
                    </div>

                    <button className='flex items-center justify-center w-full bg-red-500 active:bg-red-600 active:scale-95 transition-all text-white font-bold py-[2px] px-4 rounded focus:outline-none focus:shadow-outline' type='submit'><span className="text-3xl px-3 bg-yellow-00 pb-1">⛌</span> Remove Person</button>
                </div>
            </div>
        </>
    )
}
export default Form