import axios from "axios";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";

interface Props {
    videos: Video[];
}

const Home = ({ videos }: Props) => {
    return (
        <div className="flex flex-col gap-10 videos h-full">
            {videos.length ? (
                videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
            ) : (
                <NoResults text="No Videos" type="videos" />
            )}
        </div>
    );
};

export const getServerSideProps = async ({ query: { topic } }: { query: { topic: string } }) => {
    let res;

    if (topic) {
        res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/${topic}`);
    } else {
        res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);
    }

    return {
        props: {
            videos: res.data,
        },
    };
};

export default Home;
