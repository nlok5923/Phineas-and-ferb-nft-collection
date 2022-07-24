import { useState, useContext, useEffect } from "react"
import './Update.scss'
import { Select, Spin } from "antd"
import { useParams } from "react-router-dom"
import DashboardWithNavigation from "../Dasboard"
import { UserContext } from "../../../Provider/contractProvider";
import Loader from "../../../Components/Loader/Loader"
import toast, { Toaster } from "react-hot-toast";

const UpdatePage = () => {
    const [uri, setNFTuri] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const contractData = useContext(UserContext);
    let { nftId } = useParams();

    useEffect(() => {
        console.log(contractData)
    }, [contractData])

    const mint = async () => {
        try {
            if(contractData === undefined) {
                toast.error("Please connect metamask with goerli network");
            }
            setIsLoad(true);
            await (await contractData.NFTContract.updateTokenURI(nftId, uri)).wait()
            setIsLoad(false);
            toast.success("Updated NFT attributes!!");
        } catch (err) {
            console.log(" this is contract ", contractData);
            console.log(err.message);
        }
    }

    return (
        <div>
            <Toaster />
            <Loader isLoading={isLoad}>
                <div className="create-page">
                    <div className="create-page-header">
                        <h1>
                            Update NFT metadata
                        </h1>
                    </div>
                    <div className="create-page-container">
                        <div className="create-page-container-title">
                            <input type="text" name="title"
                                onChange={(e) => setNFTuri(e.target.value)}
                                placeholder="Enter updated URI" className="course-inputStyle" />
                            <button className="mint-btn"
                                onClick={() => mint()}
                            > Update </button>
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    )
}

export default DashboardWithNavigation(UpdatePage);