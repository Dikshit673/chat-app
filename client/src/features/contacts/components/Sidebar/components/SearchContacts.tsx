import { Heading } from '@/components/ui';

const SearchForm = () => {
  return (
    <form action="">
      <input
        type="text"
        id="search-contact-input"
        name="search"
        placeholder="Search contacts"
        className="w-full rounded-lg border border-gray-500 px-3 py-1"
      />
    </form>
  );
};

const SearchContacts = () => {
  return (
    <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-2 px-4">
      <Heading.H6 title="search" />
      <SearchForm />
    </div>
  );
};

export default SearchContacts;
