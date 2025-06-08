import Image from "next/image"

function Card (props : CardProps) {
    const { children, img, tag} = props
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            {img && <Image className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/>}
            <div className="px-6 py-4">
                {
                    children && children
                }
                {/* <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p> */}
            </div>
            {
                tag &&
                <div className="px-6 pt-4 pb-2">
                    {tag.map((v, index) => {
                        return (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{v}</span>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Card

interface CardProps {
    children: any | null,
    img: string | null,
    tag: [string] | null
}