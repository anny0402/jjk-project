import { LegalLayout } from '../layout';

export default function Privacy() {
    return (
        <LegalLayout title="Privacy Policy">
            <p>
                Your privacy is critically important to us, even more than keeping Sukuna contained.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>
                We do not collect personal data unless you voluntarily submit your name via the "Summon Shikigami" contact form. We do not track your cursed energy levels.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Cookies</h2>
            <p>
                We use cookies solely to enhance the immersive experience (e.g., remembering your preferred language: English, Hindi, or Japanese). No third-party demons are allowed.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Sharing</h2>
            <p>
                We do not share your data with the Zenin, Kamo, or Gojo clans under any circumstances.
            </p>
        </LegalLayout>
    );
}
