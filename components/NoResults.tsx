import { MdOutlineVideocamOff } from "react-icons/md";
import { MdPersonOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

const NoResults = ({ text, type }: { text: string; type: string }) => {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <p className="text-8xl">
                {type === "videos" ? <MdOutlineVideocamOff /> : type === "accounts" ? <MdPersonOff /> : <BiCommentX />}
            </p>
            <p className="text-xl text-center">{text}</p>
        </div>
    );
};

export default NoResults;
