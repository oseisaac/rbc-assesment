// Helper script for testing query parameters

const RBCTest = {
    // Check if we can read segments from URLs properly
    testQueryParamReading: function () {
        console.log('=== Testing URL segment reading ===');

        // Try a bunch of different URLs
        const testUrls = [
            'http://localhost:3000/index.html',
            'http://localhost:3000/index.html?segment=student',
            'http://localhost:3000/index.html?segment=newcomer',
            'http://localhost:3000/index.html?segment=invalid',
            'http://localhost:3000/index.html?other=param&segment=student',
            'http://localhost:3000/index.html?segment=student&other=param'
        ];

        testUrls.forEach(url => {
            const urlObj = new URL(url);
            const segment = urlObj.searchParams.get('segment');
            console.log(`URL: ${url}`);
            console.log(`  Found segment: "${segment}"`);
            console.log(`  Is it valid? ${segment && ['student', 'newcomer'].includes(segment)}`);
            console.log('');
        });
    },

    // See how A/B groups get assigned
    testABGroupAssignment: function () {
        console.log('=== Testing A/B group assignment ===');

        const currentGroup = localStorage.getItem('rbc-ab-group');
        console.log(`You're currently in: ${currentGroup || 'No group yet'}`);

        // Show what random assignment looks like
        console.log('Here\'s what 10 random assignments would look like:');
        for (let i = 0; i < 10; i++) {
            const group = Math.random() < 0.5 ? 'A' : 'B';
            console.log(`  Try ${i + 1}: Group ${group}`);
        }
    },

    // Test the logic that decides what content to show
    testContentPersonalization: function () {
        console.log('=== Testing the personalization logic ===');

        const testCases = [
            { abGroup: 'A', segment: null, expected: 'default' },
            { abGroup: 'A', segment: 'student', expected: 'default' },
            { abGroup: 'A', segment: 'newcomer', expected: 'default' },
            { abGroup: 'B', segment: null, expected: 'default' },
            { abGroup: 'B', segment: 'student', expected: 'personalized' },
            { abGroup: 'B', segment: 'newcomer', expected: 'personalized' },
            { abGroup: 'B', segment: 'invalid', expected: 'default' }
        ];

        testCases.forEach((testCase, index) => {
            const shouldPersonalize = testCase.abGroup === 'B' &&
                testCase.segment &&
                ['student', 'newcomer'].includes(testCase.segment);

            const result = shouldPersonalize ? 'personalized' : 'default';
            const passed = result === testCase.expected;

            console.log(`Test ${index + 1}: Group ${testCase.abGroup}, Segment "${testCase.segment}"`);
            console.log(`  Expected: ${testCase.expected}, Got: ${result}, ${passed ? 'PASS' : 'FAIL'}`);
            console.log('');
        });
    },

    // Check what content is actually showing on the page
    testContentChanges: function () {
        console.log('=== Checking what content is showing ===');

        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroCTA = document.getElementById('hero-cta');

        if (!heroTitle || !heroSubtitle || !heroCTA) {
            console.error('Oops, can\'t find the content elements!');
            return;
        }

        console.log('What\'s currently on the page:');
        console.log(`  Title: "${heroTitle.innerHTML}"`);
        console.log(`  Subtitle: "${heroSubtitle.textContent}"`);
        console.log(`  Button: "${heroCTA.textContent}"`);

        // Figure out what type of content this is
        const isDefault = heroTitle.innerHTML.includes('Eligible RBC') &&
            heroSubtitle.textContent.includes('Get the New iPad') &&
            heroCTA.textContent === 'View Offer Details';

        const isStudent = heroTitle.innerHTML.includes('Student Chequing Account') &&
            heroSubtitle.textContent.includes('iPad for School') &&
            heroCTA.textContent === 'See Student Offer';

        const isNewcomer = heroTitle.innerHTML.includes('Newcomer Account') &&
            heroSubtitle.textContent.includes('Start Your Journey') &&
            heroCTA.textContent === 'See Newcomer Offer';

        console.log('');
        console.log('What type of content is this?');
        console.log(`  Default content: ${isDefault}`);
        console.log(`  Student content: ${isStudent}`);
        console.log(`  Newcomer content: ${isNewcomer}`);
    },

    // Try out a specific scenario
    simulateScenario: function (abGroup, segment) {
        console.log(`=== Trying out: Group ${abGroup}, Segment "${segment}" ===`);

        // Set your group
        localStorage.setItem('rbc-ab-group', abGroup);
        console.log(`You're now in group: ${abGroup}`);

        // What URL would this be?
        const url = segment ? `index.html?segment=${segment}` : 'index.html';
        console.log(`This would be the URL: ${url}`);

        // Would this show personalized content?
        const shouldPersonalize = abGroup === 'B' &&
            segment &&
            ['student', 'newcomer'].includes(segment);

        console.log(`Would show personalized content? ${shouldPersonalize}`);

        if (shouldPersonalize) {
            const segmentMessages = {
                student: {
                    title: 'Open an RBC Student Chequing Account',
                    subtitle: 'and Get the New iPad for School',
                    cta: 'See Student Offer'
                },
                newcomer: {
                    title: 'Open an RBC Newcomer Account',
                    subtitle: 'and Get the New iPad to Start Your Journey',
                    cta: 'See Newcomer Offer'
                }
            };

            const message = segmentMessages[segment];
            console.log('The personalized content would be:');
            console.log(`  Title: "${message.title}"`);
            console.log(`  Subtitle: "${message.subtitle}"`);
            console.log(`  Button: "${message.cta}"`);
        } else {
            console.log('Would show the normal default content');
        }
    },

    // Run everything
    runAllTests: function () {
        console.log('🧪 Running all the tests...\n');

        this.testQueryParamReading();
        this.testABGroupAssignment();
        this.testContentPersonalization();
        this.testContentChanges();

        console.log('Done!');
    },

    clearStorage: function () {
        localStorage.removeItem('rbc-ab-group');
        console.log('🗑️ Cleared your group - refresh to get a new random one');
    },

    setABGroup: function (group) {
        localStorage.setItem('rbc-ab-group', group);
        console.log(`🎯 You're now in group ${group}`);
    }
};

// add it to browser window everywhere: State management
window.RBCTest = RBCTest;

console.log('🚀 Testing helper loaded!');
console.log('You can use:');
console.log('  RBCTest.runAllTests() - Run everything');
console.log('  RBCTest.testQueryParamReading() - Test URL reading');
console.log('  RBCTest.testABGroupAssignment() - Test group assignment');
console.log('  RBCTest.testContentPersonalization() - Test the logic');
console.log('  RBCTest.testContentChanges() - Check current content');
console.log('  RBCTest.simulateScenario(abGroup, segment) - Try a scenario');
console.log('  RBCTest.clearStorage() - Clear your group');
console.log('  RBCTest.setABGroup(group) - Force a group'); 