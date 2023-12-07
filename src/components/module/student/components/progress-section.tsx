import { Stepper } from '../../stepper';

export function ProgressSection() {
  return (
    <section className="space-y-20 divide-y">
      <div className="pt-10 pb-5 space-y-20">
        <Stepper
          steps={[
            'Proposal',
            'Pre-Oral Defense',
            'Ethics',
            'Full Manuscript',
            'Final Defense',
            'Copyright',
          ]}
          currentStep={3}
          // className="justify-center"
        />

        <div className="">
          <article className="prose prose-sm">
            <h2>Full Manuscript</h2>

            <ul>
              <li>
                <h3>Content</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam deleniti, sit reprehenderit accusantium placeat,
                  animi, atque esse saepe ea nostrum nihil earum quidem
                  laboriosam. Et accusamus dicta reiciendis. Ipsa, natus.
                </p>
              </li>
              <li>
                <h3>Abstract</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam deleniti, sit reprehenderit accusantium placeat,
                  animi, atque esse saepe ea nostrum nihil earum quidem
                  laboriosam. Et accusamus dicta reiciendis. Ipsa, natus.
                </p>
              </li>
            </ul>
          </article>
        </div>
      </div>

      <div className="prose dark:prose-headings:text-white max-w-none py-10">
        <h2>Announcement</h2>

        <p>
          🌟 Now Accepting Applications: Research Excellence Grants at PUP! 🌟
        </p>

        <h3>Dear PUP Faculty and Researchers,</h3>

        <p>
          Exciting news! The Research Excellence Grants program is now accepting
          applications. This is your chance to secure funding of up to Php50,000
          per project, fueling your innovative research across all academic
          disciplines.
        </p>

        <p>Apply by January 1, 2024!</p>

        <p>
          Seize this opportunity to turn your groundbreaking ideas into reality.
          Let your research journey begin! Access the Google Form to submit your
          application today.
        </p>

        <p>🔗 www.gformsample.com/sample</p>

        <p>Let your research journey begin!</p>

        <p>Best Regards,</p>

        <p>PUPQC Research Admin</p>
      </div>
    </section>
  );
}
