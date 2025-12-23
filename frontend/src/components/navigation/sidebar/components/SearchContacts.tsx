import { Heading, Input } from '@/components/ui';

const SearchForm = () => {
  return (
    <form action=''>
      <Input
        id='search-contact-input'
        name='search'
        label=''
        inputSize='lg'
        placeholder='Search Contacts'
      />
    </form>
  );
};

const SearchContacts = () => {
  return (
    <div className='grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-2'>
      <Heading.H6>Search</Heading.H6>
      <SearchForm />
    </div>
  );
};

export default SearchContacts;
