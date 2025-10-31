import { BiSearch } from 'react-icons/bi';

const Search = () => {
  return (
    <div className='
       
        border-transparent
        hover:border-beige
        w-full 
        md:w-auto
        py-2
        rounded-full
        transition
        cursor-pointer
        bg-charcoal
        
    '
    >
        <div className='flex flex-row items-center justify-between'>
            <div className='text-sm text-beige px-6 hidden sm:block flex-1 text-center'>
               Where
            </div>
            <div  className='text-sm text-beige px-6 hidden sm:block flex-1 text-center' >
              When 
            </div>
            <div  className='text-sm text-beige px-6 hidden sm:block flex-1 text-center' >
              Era
            </div>
            <div  className='text-sm text-beige px-6 hidden sm:block flex-1 text-center' >
              Who
            </div>
            <div  className='p-2 mx-2 bg-gold  sm:flex text-black rounded-full flex flex-row items-center justify-between  gap-3 ' >
               <span>  Search  </span>
               <BiSearch  size={18}/>
            </div>
            <div className='flex sm:hidden flex-row items-center gap-2 px-3'>
              <div className='p-2 bg-gold text-black rounded-full flex items-center justify-center'>
                <BiSearch size={18} />
              </div>
              <span className='text-gray-400 text-sm ml-2 '>
                 Start search
              </span>
            </div>
        </div>
    </div>
  )
}

export default Search