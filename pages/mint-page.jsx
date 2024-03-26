import Button from "@/components/Button";
import NftItem from "@/components/NftItem";
import React from "react";


const mintPage = () => {

    return (
        <div>
            <div className="padding-top-64"></div>
            <div className="flex-justify-between wrapped-body ">
                <div>
                    <NftItem />
                    <Button />
                </div>

                <NftItem />
                <NftItem />
                <NftItem />
                <NftItem />
                <NftItem />
            </div>
        </div>


    )
}

export default mintPage