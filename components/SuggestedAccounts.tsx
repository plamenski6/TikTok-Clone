import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";

import { User } from "../types";

const SuggestedAccounts = () => {
    const { fetchAllUsers, allUsers } = useAuthStore();

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return (
        <div className="xl:border-b-2 border-gray-200 pb-4">
            <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Suggested Accounts</p>

            <div className="flex flex-col justify-center">
                {allUsers.slice(0, 5).map((user: User) => (
                    <Link href={`/profile/${user._id}`} key={user._id} passHref>
                        <div className="flex gap-3 hover:bg-primary cursor-pointer font-semibold rounded p-3">
                            <div className="w-10 h-10">
                                <Image
                                    src={user.image}
                                    width={40}
                                    height={40}
                                    alt={user.userName}
                                    className="rounded-full"
                                    layout="responsive"
                                />
                            </div>
                            <div className="hidden xl:block">
                                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                    {user.userName.replaceAll(" ", "")} <GoVerified className="text-blue-400" />
                                </p>
                                <p className="capitalize text-gray-400 text-xs">{user.userName}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SuggestedAccounts;
