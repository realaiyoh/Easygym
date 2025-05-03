import { Button } from "@/components/ui/button";

const Workouts = () => {
    const workouts = []; // Temporary empty array, replace with actual workout data source

    if (workouts.length === 0) {
        return (
            <div className="flex flex-col gap-2 items-center justify-center h-screen">
                <h1 className="text-2xl">No Workouts Found</h1>
                <p>You don't have any workouts yet. Create your first workout to get started.</p>
                <Button>Create Workout</Button>
            </div>
        );
    }

    return <div>Workouts</div>;
};

export default Workouts;
