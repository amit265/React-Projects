import { skills } from "../utils/constants";
import SkillCard from "./SkillCard";
const Skills = () => {
  return (
    <section className="sm:min-h-[50vh] py-8">
    <h2 className="text-2xl sm:text-4xl pt-8 font-semibold font-mono text-center">
      Skills
    </h2>

    <div className="sm:w-8/12 mx-auto flex items-center justify-center ">
        <SkillCard skills = {skills}/>
    </div>
</section>
  );
};

export default Skills;
