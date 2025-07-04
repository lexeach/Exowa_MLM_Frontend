import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TermsConditions = () => {
  // const webstaticdata = useSelector((state) => state.doWin.webstaticdata);
  const webstaticdata = useSelector(
    (state) => state?.doWin?.webstaticdata || []
    );
  const data = webstaticdata[0]?.data || "Terms & Conditions";
  useEffect(() => {
    changeString(data);
  }, [webstaticdata]);
  const [usedata, setusedata] = useState("");
  const changeString = (str) => {
    if (!str) return "";
    const string = String.fromCharCode(...str);
    setusedata(string);
    return string;
  };
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[#4d33f8] to-[#261891]">
        <div className="relative">
          <img
            src={require("../../assets/images/terms-and-condition.png")}
            className="w-full lg:h-96 object-cover"
            alt=""
          />
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <h2 className="font-bold lg:text-6xl text-white">
              Terms & Conditions
            </h2>
          </div>
        </div>
      </div>
      <div className="container max-w-7xl m-auto px-4 sm:px-8 lg:py-14 py-8">
        <div className="">
          <div class="pvcpolcy">
            <div
              className="prose text-gray-700"
              dangerouslySetInnerHTML={{ __html: usedata }}
            />
            {/* <
                    {/* <h4 className='mb-4 rounded-lg text-xl text-[#4d33f8] font-[500]'>1. What is the use of company policy?</h4>
                    <p className='text-gray-600 mb-5'>
                        Company policy is set in place to establish the rules of conduct within an organization, outlining the responsibilities of both employees and employers. The management of company policy and procedures aims to protect the rights of workers as well as the business interests of employers. A company policy is a guideline to help employers deal with employee accountability, health, safety, and interactions with customers. A company policy helps foster employee wellness, and fair treatment, and ensures that a company is following laws and regulations.
                    </p> 

                    <h4 className='mb-4 rounded-lg text-xl text-[#4d33f8] font-[500]'>2. Why company needs a policy?</h4>
                    <p className='text-gray-600 mb-5'>
                        Employers are often confronted with employee relations issues in the workplace and faced with deciding the best approach in handling these issues. Company policies are created to establish expectations and to provide guidance on how to consistently handle workplace situations. Although most company policies are not all-encompassing, they provide direction regarding what is appropriate as well as inappropriate or unacceptable behaviour. Company policies help maintain order within the organization and ensure that people are treated fairly and equally. Policies also help employees understand what is expected of them.
                    </p>

                    <h4 className='mb-4 rounded-lg text-xl text-[#4d33f8] font-[500]'>3. Probation Period Rules &amp; Regulations</h4>
                    <p className='text-gray-600 mb-5'>
                        The probation period is a duration of time in which the performance and behaviour of the newly hired employee is monitored by the company or seniors in order to check the employee’s potential as well as the employee’s suitability for the job. The probation and confirmation policy clearly stated that a new employee should meet the set standard of performance, should follow the code of conduct of the organization and behave in an acceptable manner. Our organization has a 15 to 30 days probation period. The probation examination period is also considered as an extension of the selection process. The probation process begins with appointment and later stages include job allocation, completion of probation period and review of performance. The Project coordinator and HR department play important roles throughout the critical examination and evaluation period of the employee. Employee Introduction &amp; Query Day First whole day of a New Employee is an Introduction &amp; Query Day in the Company. Employees should need to read this document clearly with a sharp mind. So that employees can fulfil their roles &amp; responsibilities very well and can give their best performance in the probation period. Employees should meet the expectations of the company so that, according to the employee performance, the company can take an employee on-roll and employees can clear their probation period. Employees need to understand the rules &amp; regulations of the company and understand their work in the company. If an employee is unable to understand the rules &amp; regulations or roles &amp; responsibilities or faces any query regarding this document, then the employee can contact the management to answer their queries on the first day only. So, then management can help them to solve their queries &amp; issues. After that, the employee can understand &amp; meet the expectations of the company. Then, after the second day, the company will not tell employees their roles &amp; responsibilities or rules &amp; regulations or whatever is mentioned in this document. If an employee neglects or breaks to follow this document process or rules, then the company can terminate the employee. So, it’s the employee’s duty to follow the rules properly &amp; strictly mentioned in this document.
                    </p>

                    <h4 className='mb-4 rounded-lg text-xl text-[#4d33f8] font-[500]'>4. Probation and Confirmation Policy?</h4>
                    <p className='text-gray-600 mb-5'>
                        The company will assign the work to the employee, provide guidance and invest their time so that the employee can fulfill it, but if, in case the employee leaves the company during the probation period, then the employee needs to pay a 1 Month salary to the company as a penalty.
                    </p>
                    <p className='text-gray-600 mb-5'>
                        After joining, the reporting manager will assign jobs to the employee and will set a standard goal or target. This goal should be agreed by the employee.
                    </p>
                    <p className='text-gray-600 mb-5'>
                        At the end of the probation period, the set performance target and the achieved performance will be compared by the reporting manager.
                    </p>
                    <p className='text-gray-600 mb-5'>The manager will assign you the work. Then it’s a new employee's responsibility to finish a given range of tasks on the set deadlines. If there is a gap between the agreed work plans, the set target and the actual performance of the employee, then the manager has the authority to conclude that work performance was not satisfactory. If an employee fails to achieve the standard performance, then the organization can guide you for the improvement of performance or can directly terminate the employee.</p>
                    <p className='text-gray-600 mb-5'>
                        Employees should perform the duties and carry out the assignments entrusted to them from time to time efficiently, faithfully and to the best of their ability and capacity.
                    </p>
                    <p className='text-gray-600 mb-5'>
                        Employees should keep and render a faithful account of all property and business secrets of the company entrusted to the employee in the course of your employment and should not disclose to anybody at any time, during your services or even after employee leave the services of the company.
                    </p>
                    <p className='text-gray-600 mb-5'>
                        During the course of employee employment with the company, employees cannot accept any other employment, full –time or part-time, either for remuneration or otherwise. Also, employees can not engage in any trade, business or occupation and employees should devote their full time and energy to discharging their duties as our employees during working hours.
                    </p>
                    
                    <h4 className='mb-4 rounded-lg text-xl text-[#4d33f8] font-[500]'>5. Extension of Probationary Period Policy</h4>
                    <p className='text-gray-600 mb-5'>
                        The extension of the probationary period is not that common but will be considered in a few circumstances. It is mandatory that the extension of the probationary period is agreed by the employee. The cases given below are eligible for the extension of the probationary period –
                    </p> 
                    <ul className='grid gap-3 list-disc ml-4'>
                        <li className='text-gray-600'>
                            Non-recurring illness- If the employee falls ill during the probation period which is a non-recurring illness, then probation period will be suspended during the absence of the employee.
                        </li>
                        <li className='text-gray-600'>
                            Any other case which is recommended by the reporting manager or HR department can be considered for probation period extension based on the severity of the circumstances. The probation period will restart once the employee re-joins after leaving.
                        </li>
                        <li className='text-gray-600'>
                            The company can extend the probation period of the employee if in case, the employee is capable of giving their performance and able to fulfil the task or goals related to their assigned work at a particular time given by the manager.
                        </li> 
                    </ul>  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
