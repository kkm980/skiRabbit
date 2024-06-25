import "./style.css"

const AboutNftCard = ({ tokenId }: { tokenId: number }) => {
    return (
        <div className="card">
            <div className="container-image">
                <div
                    className="imgContainer bg-contain bg-no-repeat w-[100%] h-[100%] rounded-[50%]"
                    style={{ backgroundImage: `url('https://plum-sophisticated-turkey-938.mypinata.cloud/ipfs/QmQ8zHxHU94hy98AdA1PJM5JtC8UTE8EhPUCaX1wxPKGJ6/${tokenId}.png')` }}
                >
                </div>
            </div>
            <div className="content">
                <div className="detail">
                    <span>Lorem Ipsum dolor.</span>
                    <p>$199</p>
                    <button>Buy</button>
                </div>
                <div className="product-image">
                    <div className="box-image">
                    <div
                    className="imgContainer bg-contain bg-no-repeat w-[100%] h-[100%] rounded-[50%]"
                    style={{ backgroundImage: `url('https://plum-sophisticated-turkey-938.mypinata.cloud/ipfs/QmQ8zHxHU94hy98AdA1PJM5JtC8UTE8EhPUCaX1wxPKGJ6/${tokenId}.png')` }}
                >
                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutNftCard;