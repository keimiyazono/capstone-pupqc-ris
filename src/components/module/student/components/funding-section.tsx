import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function FundingSection() {
  return (
    <section>
      <Card>
        <CardHeader className="prose max-w-none">
          <h2>Funding Opportunities</h2>
          <p>
            Welcome to the Funding Opportunities section of the Polytechnic
            University of the Philippines&apos;s Research Information System
            (URIS). We are pleased to offer the following funding opportunities
            to support your research endeavors:
          </p>
        </CardHeader>
        <CardContent>
          <article className="prose max-w-none">
            <h3>Research Excellence Grants</h3>

            <ul>
              <li>
                <p>
                  <strong>Description:</strong>
                </p>
                <p>
                  The Research Excellence Grants program is designed to support
                  groundbreaking research projects across all academic
                  disciplines. These grants aim to provide researchers with the
                  resources they need to pursue innovative ideas, expand their
                  horizons, and make significant contributions to their fields.
                  Funding can be used for equipment, materials, travel, and
                  project-related expenses.
                </p>
              </li>

              <li>
                <p>
                  <strong>Eligibility:</strong>
                </p>
                <p>
                  Faculty members and researchers at the Polytechnic University
                  of the Philippines. Proposals from interdisciplinary teams are
                  encouraged.
                </p>
              </li>

              <li>
                <p>
                  <strong>Grant Amount:</strong>
                </p>
                <p>Up to Php 50,000 per project</p>
              </li>

              <li>
                <p>
                  <strong>Application Deadline:</strong>
                </p>
                <p>January 1, 2024</p>
              </li>

              <li>
                <p>
                  <strong>How to Apply:</strong>
                </p>
                <p>
                  To apply for a Research Excellence Grant, please complete the
                  online application form available on the URIS portal. Ensure
                  that you provide a well-documented research proposal outlining
                  your project&apos;s objectives, methodology, expected
                  outcomes, and a detailed budget.
                </p>
              </li>
            </ul>

            <h3>Student Research Scholarships</h3>

            <ul>
              <li>
                <p>
                  <strong>Description:</strong>
                </p>
                <p>
                  The Research Excellence Grants program is designed to support
                  groundbreaking research projects across all academic
                  disciplines. These grants aim to provide researchers with the
                  resources they need to pursue innovative ideas, expand their
                  horizons, and make significant contributions to their fields.
                  Funding can be used for equipment, materials, travel, and
                  project-related expenses.
                </p>
              </li>

              <li>
                <p>
                  <strong>Eligibility:</strong>
                </p>
                <p>
                  Faculty members and researchers at the Polytechnic University
                  of the Philippines. Proposals from interdisciplinary teams are
                  encouraged.
                </p>
              </li>

              <li>
                <p>
                  <strong>Grant Amount:</strong>
                </p>
                <p>Up to Php 50,000 per project</p>
              </li>

              <li>
                <p>
                  <strong>Application Deadline:</strong>
                </p>
                <p>January 1, 2024</p>
              </li>

              <li>
                <p>
                  <strong>How to Apply:</strong>
                </p>
                <p>
                  To apply for a Research Excellence Grant, please complete the
                  online application form available on the URIS portal. Ensure
                  that you provide a well-documented research proposal outlining
                  your project&apos;s objectives, methodology, expected
                  outcomes, and a detailed budget.
                </p>
              </li>
            </ul>
          </article>
        </CardContent>
      </Card>
    </section>
  );
}
