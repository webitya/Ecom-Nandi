const ProfileEditEl = ({ profile, setProfile, setEditable }) => {
    // Reusable Profile Input Component
    const ProfileInputEdit = ({ label, name, value }) => {
        const handleChange = (e) => {
            const { name, value } = e.target; // Fixed destructuring from `e.target`
            setProfile((prev) => ({ ...prev, [name]: value }));
        };

        return (
            <div className="flex gap-4">
                <label className="font-semibold sm:block mb-1 w-[5.65rem] hidden">{label}:</label>
                <input
                    type="text"
                    name={name}
                    placeholder={label}
                    value={value}
                    onChange={handleChange}
                    className="mb-2 px-3 py-1 text-sm w-full sm:w-[65%] rounded-sm outline outline-1 outline-blue-500"
                />
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditable(false);
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mx-auto">
            <h2 className="sm:text-3xl text-xl mb-4 font-bold text-gray-800 justify-self-start">Edit Profile</h2>
            <form className="flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
                {/* Correctly render the reusable input component */}
                <ProfileInputEdit
                    label="First Name"
                    name="firstName"
                    value={profile.firstName}
                />
                <ProfileInputEdit
                    label="Last Name"
                    name="lastName"
                    value={profile.lastName}
                />
                <ProfileInputEdit
                    label="Email"
                    name="email"
                    value={profile.email}
                />

                {/* Action Buttons */}
                <div className="flex gap-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-3 py-1 rounded-md font-bold"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="text-red-400"
                        onClick={() => setEditable(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditEl;
