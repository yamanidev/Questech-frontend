import { useNavigate } from "react-router-dom";
import archi from "assets/courses/architecture.jpg";
import placeholder from "assets/courses/course-placeholder.jpg";
import db from "assets/courses/databases.jpg";
import eco from "assets/courses/economy.jpg";
import elec from "assets/courses/electronics.jpg";
import lang from "assets/courses/languages.jpg";
import linux from "assets/courses/linux.jpg";
import math from "assets/courses/math.jpg";
import networking from "assets/courses/networking.jpg";
import physics from "assets/courses/physics.jpg";
import programming from "assets/courses/programming.jpg";
import security from "assets/courses/security.jpg";
import stat from "assets/courses/statistics.jpg";
import web from "assets/courses/web.jpg";

const mathematics = ["ALG1", "ANA1", "ANA2", "ALG2", "ANA3", "ALG3", "ANA4", "LOG", "AN"];
const architecture = ["ARCHI1", "ARCHI2", "ARCHIE"];
const os = ["ISE1", "ISE2", "SE1", "SE2"];
const prog = ["ALSDS", "ALSDD", "POO", "PROJ1", "IGL", "PROJ2"];
const electric = ["ELEC1", "ELECF1", "ELECF2"];
const languages = ["TEE1", "TEO1", "LANGL1", "LANGL2", "LANGL3", "LANGL4", "LANGL5"];
const webdev = ["BWEB1", "LOW"];
const phys = ["MECA", "OOE"];
const statistics = ["PROBA1", "PROBA2"];
const economy = ["ECO"];
const netw = ["RES1", "RES2"];
const dbs = ["BDD"];
const sec = ["ISECI"];

function CoursesListItemStudent(props) {
  const { course } = props;

  const navigate = useNavigate();

  if (mathematics.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={math} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (architecture.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={archi} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (dbs.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={db} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (economy.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={eco} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (electric.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={elec} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (languages.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={lang} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (os.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={linux} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (netw.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={networking} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (phys.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={physics} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (prog.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={programming} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (sec.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={security} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (statistics.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={stat} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  if (webdev.includes(course.code))
    return (
      <div
        onClick={() => {
          navigate(`/student/course/${course.code}`);
        }}
        className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
        <img src={web} alt="" className="h-[300px]" />
        <div className="py-2 px-5">
          {course.detailedName.length <= 16 ? (
            <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
          ) : (
            <h3 className="text-2xl font-semibold">{course.code}</h3>
          )}
          <h4 className="text-lg">{course.promo}</h4>
          <h5>S{course.semester}</h5>
        </div>
      </div>
    );

  return (
    <div
      onClick={() => {
        navigate(`/student/course/${course.code}`);
      }}
      className="h-[400px] w-[300px] bg-[#e4e4e4] shadow-xl overflow-hidden rounded cursor-pointer">
      <img src={placeholder} alt="" className="[300px]" />
      <div className="py-2 px-5">
        {course.detailedName.length <= 16 ? (
          <h3 className="text-2xl font-semibold">{course.detailedName}</h3>
        ) : (
          <h3 className="text-2xl font-semibold">{course.code}</h3>
        )}
        <h4 className="text-lg">{course.promo}</h4>
        <h5>S{course.semester}</h5>
      </div>
    </div>
  );
}

export default CoursesListItemStudent;
