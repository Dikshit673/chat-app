import { Heading } from '@/components/ui';

const SearchContacts = () => {
  return (
    <div className="space-y-1 px-4">
      <Heading.H6 title="search contacts" />
      <form action="">
        <input
          type="text"
          className="w-full rounded-lg border border-gray-500 px-3 py-1"
        />
      </form>
    </div>
  );
};

export default SearchContacts;
