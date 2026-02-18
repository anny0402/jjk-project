import { LegalLayout } from '../layout';

export default function Terms() {
    return (
        <LegalLayout title="Terms of Cursed Energy">
            <p>
                These Terms govern your use of the Jujutsu Kaisen Immersive Platform. By accessing this site, you agree to be bound by these terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Use of Content</h2>
            <p>
                All character names, images, and storylines are the intellectual property of Gege Akutami and Shueisha. This is a fan-made project for demonstration purposes only.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Cursed Objects</h2>
            <p>
                You agree not to bring any Special Grade Cursed Objects onto the digital premises. Possession of Sukuna's fingers is strictly prohibited.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Domain Expansion</h2>
            <p>
                Users are not permitted to cast Domain Expansions within the comment sections or contact forms unless authorized by a Grade 1 Sorcerer or higher.
            </p>
        </LegalLayout>
    );
}
