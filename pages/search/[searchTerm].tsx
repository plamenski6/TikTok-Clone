import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import useAuthStore from "../../store/authStore";
import { User, Video } from "../../types";

const Search = ({ data }: { data: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(true);
    const router = useRouter();
    const { searchTerm }: any = router.query;
    const { allUsers } = useAuthStore();

    const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
    const videos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

    const searchedAccounts = allUsers.filter((user: User) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
                <p
                    className={`text-xl font-semibold cursor-pointer mt-2 select-none ${accounts}`}
                    onClick={() => setIsAccounts(true)}
                >
                    Accounts
                </p>
                <p
                    className={`text-xl font-semibold cursor-pointer mt-2 select-none ${videos}`}
                    onClick={() => setIsAccounts(false)}
                >
                    Videos
                </p>
            </div>

            {isAccounts ? (
                <div>
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user: User, idx: number) => (
                            <Link href={`/profile/${user._id}`} key={idx} passHref>
                                <div className="flex gap-3 cursor-pointer p-2 font-semibold rounded border-b-2 border-gray-200">
                                    <div>
                                        <Image
                                            src={user.image}
                                            width={45}
                                            height={45}
                                            alt={user.userName}
                                            className="rounded-full"
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
                        ))
                    ) : (
                        <NoResults text={`No account results for ${searchTerm}`} type="accounts" />
                    )}
                </div>
            ) : (
                <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                    {data.length ? (
                        data.map((video: Video, idx: number) => <VideoCard post={video} key={idx} />)
                    ) : (
                        <NoResults text={`No video results for ${searchTerm}`} type="videos" />
                    )}
                </div>
            )}
        </div>
    );
};

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`);

    return {
        props: {
            data,
        },
    };
};

export default Search;
