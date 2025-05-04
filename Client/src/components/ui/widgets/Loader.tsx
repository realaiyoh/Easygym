import LoadingSpinner from '@/components/ui/widgets/LoadingSpinner';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <LoadingSpinner />
    </div>
  );
};

export default Loader;
