import Image from "next/image"

function Footer () {
    return (
        <footer className="mt-16 border-t border-line bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                    <div className="flex items-center gap-2.5">
                        <Image className="h-7 w-7 rounded-lg" src={'/logo_.png'} width={28} height={28} alt="Match Note Maker"/>
                        <div>
                            <div className="text-sm font-bold text-ink">Match Note Maker</div>
                            <div className="text-xs text-faint">Analyze the game. Skip the bet.</div>
                        </div>
                    </div>
                    <div className="text-xs text-faint">
                        v1.1.0 · © 2025{' '}
                        <a className="hover:text-pitch-700" href="https://wuebuild.com" target="_blank" rel="noreferrer">wuebuild.com</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
