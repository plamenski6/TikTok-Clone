import { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { User, Video } from "../../types";

interface Props {
    data: {
        user: User;
        userVideos: Video[];
        likedVideos: Video[];
    };
}

const Profle = ({ data }: Props) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videosList, setVideosList] = useState<Video[]>([]);
    const { user, userVideos, likedVideos } = data;

    const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
    const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

    useEffect(() => {
        if (showUserVideos) {
            setVideosList(userVideos);
        } else {
            setVideosList(likedVideos);
        }
    }, [showUserVideos, userVideos, likedVideos]);

    return (
        <div className="w-full pt-2">
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
                <div className="w-16 h-16 md:w-32 md:h-32">
                    <Image
                        src={user.image}
                        width={120}
                        height={120}
                        alt={user.userName}
                        className="rounded-full"
                        layout="responsive"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="md:text-2xl tracking-wider flex gap-1 items-center text-md font-bold text-primary lowercase items-center justify-center">
                        {user.userName.replaceAll(" ", "")} <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize md:text-xl text-gray-400 text-xs">{user.userName}</p>
                </div>
            </div>

            <div>
                <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
                    <p
                        className={`text-xl font-semibold cursor-pointer mt-2 select-none ${videos}`}
                        onClick={() => setShowUserVideos(true)}
                    >
                        Videos
                    </p>
                    <p
                        className={`text-xl font-semibold cursor-pointer mt-2 select-none ${liked}`}
                        onClick={() => setShowUserVideos(false)}
                    >
                        Liked
                    </p>
                </div>

                <div className="flex gap-6 flex-wrap md:justify-start">
                    {videosList.length > 0 ? (
                        videosList.map((post: Video, idx: number) => <VideoCard post={post} key={idx} />)
                    ) : (
                        <NoResults text={`No ${showUserVideos ? "" : "Liked"} Videos Yet.`} type="videos" />
                    )}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);

    return {
        props: {
            data,
        },
    };
};

export default Profle;
