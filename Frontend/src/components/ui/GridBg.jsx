import { Tiles } from "../Tiles"
import { InteractiveHoverButton } from "./Button2"
export const Example = () => (
  <AnimatedGridBackgroundSection>
   <p className="md:text-5xl z-50 text-4xl text-center" style={{
            fontFamily: "'Orbitron', sans-serif",
            WebkitBackgroundClip: "text",
            textShadow:
              "0 0 15px rgba(168,85,247,0.7), 0 0 30px rgba(99,102,241,0.5)",
          }}>Discover GitTestPULSe</p> 
          <p className="text-center z-50 mt-4 text-sm md:text-lg">Unlock the power of automated test case generation with GITTESTPULSe. Seamlessly integrate your GitHub repositories and generate comprehensive test summaries with ease.</p>
          {/* <div  className="btn flex justify-center items-center mt-5">
          <InteractiveHoverButton>Continue with GitHub</InteractiveHoverButton>
          </div> */}
  </AnimatedGridBackgroundSection>
)

const AnimatedGridBackgroundSection = ({ children }) => {
  return (
    <div
    
      className={
        'w-full h-full min-h-[400px]  font-bold relative overflow-hidden flex items-center justify-center'
      }
    >
      <div className={'w-fit h-fit relative z-[2]'}>{children}</div>
      <div className={'absolute top-0 left-0 h-full w-full'}>
        <Tiles rows={30} cols={20} />
      </div>
    </div>
  )
}
