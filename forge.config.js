module.exports = {
    packagerConfig: {
        icon:'book'
    },
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
                iconUrl: 'https://book.ico',
                // The ICO file to use as the icon for the generated Setup.exe
                setupIcon: 'book.ico'
            }
        },
        {
            // Path to a single image that will act as icon for the application
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    icon: 'book.ico'
                }
            }
        },
        {
            // Path to the icon to use for the app in the DMG window
            name: '@electron-forge/maker-dmg',
            config: {
                icon: 'book.ico'
            }
        },
        {
            name: '@electron-forge/maker-wix',
            config: {
                icon: 'book.ico'
            }
        }
    ]
};