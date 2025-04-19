export default function Home() {
    const backgroundStyle = {
        backgroundImage: "url('https://preview.redd.it/alien-romulus-wallpaper-poster-hd-v0-hg1atry5void1.jpg?width=1080&crop=smart&auto=webp&s=e00942a88fbadc121dc96d44427d51ff4dbe3be5')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
    };

    return (
        <div style={backgroundStyle}>
            <h1>Welcome to Home</h1>
        </div>
    );
}