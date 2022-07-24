import { useState, useContext, useEffect } from "react"
import './Listings.scss'
import { Select, Spin } from "antd"
import DashboardWithNavigation from "../Dasboard"
import { UserContext } from "../../../Provider/contractProvider";
import Loader from "../../../Components/Loader/Loader"
import toast, { Toaster } from "react-hot-toast";
import PostCard from '../../../Components/PostCard/PostCard'
import { Link } from "react-router-dom";

const CreatePage = () => {
    const [uri, setNFTuri] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const contractData = useContext(UserContext);
    const [nftUri, setNFTUri] = useState([]);

    const _fetchPost = async () => {
        try {
            if (contractData === undefined) {
                toast.error("Please connect metamask and make sure goerli is selected !!");
            } else {
                setIsLoad(true)
                const totalTokens = await contractData.marketPlace.itemCount();
                console.log(totalTokens);
                for (let indx = 0; indx < totalTokens; indx++) {
                    const nft = await contractData.marketPlace.items(indx)
                    console.log(nft);
                    const uri = await contractData.NFTContract.tokenURI(nft.tokenId)
                    console.log(uri);
                    setNFTUri(prev => [...prev, { uri: uri, id: indx }]);
                    console.log(nftUri)
                }
                setIsLoad(false)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        console.log(contractData)
        _fetchPost()
    }, [contractData])

    return (
        <div>
            <Loader isLoading={isLoad}>
                <div className="page-container">
                    {nftUri.map((data, id) => <Link to={`/dashboard/listing/${data.id}`}>
                        <PostCard key={id} data={data.uri} />
                    </Link>
                    )}
                </div>
            </Loader>
        </div>
    )
}

export default DashboardWithNavigation(CreatePage);