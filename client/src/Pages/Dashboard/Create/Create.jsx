import { useState, useContext, useEffect } from "react"
import './Create.scss'
import { Select, Spin } from "antd"
import DashboardWithNavigation from "../Dasboard"
import { UserContext } from "../../../Provider/contractProvider";
import Loader from "../../../Components/Loader/Loader"
import toast, { Toaster } from "react-hot-toast";

const CreatePage = () => {
    const [uri, setNFTuri] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const contractData = useContext(UserContext);
    useEffect(() => {
        console.log(contractData)
    }, [contractData])

    const mint = async () => {
        try {
            console.log(uri);
            if (contractData === undefined) {
                toast.error("Please connect metamask !!");
            } else {
                setIsLoad(true);
                await (await contractData.NFTContract.safeMint(contractData.address, uri)).wait()
                const id = await contractData.NFTContract.tokenCount()
                await (await contractData.NFTContract.setApprovalForAll(contractData.MarketPlaceContractAddress, true)).wait()
                await (await contractData.marketPlace.makeItem(contractData.NFTContractAddress, id - 1, { gasLimit: 9000000 })).wait()
                setIsLoad(false);
                toast.success("Minted NFT !!");
            }
        } catch (err) {
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
                            Mint NFT !!
                        </h1>
                    </div>
                    <div className="create-page-container">
                        <div className="create-page-container-title">
                            <input type="text" name="title"
                                onChange={(e) => setNFTuri(e.target.value)}
                                placeholder="Add URI link" className="course-inputStyle" />
                            <button className="mint-btn"
                                onClick={() => mint()}
                            > Mint </button>
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    )
}

export default DashboardWithNavigation(CreatePage);