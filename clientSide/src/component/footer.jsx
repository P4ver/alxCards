import React from 'react';

function Footer() {
    return (
        <div>
            <div class="relative mt-20 mx-auto bg-blue-700 px-4 pt-20">
            <nav aria-label="Footer Navigation" class="mx-auto mb-10 flex max-w-lg justify-center  text-center sm:flex-row sm:text-left">
              <a href="https://www.linkedin.com/in/habti-mohammed" target="_blank" class="font-medium text-white p-7">Linkedin</a>
              <a href="https://twitter.com/mohammed_habti" target="_blank" class="font-medium text-white p-7">Twitter</a>
              <a href="https://github.com/P4ver/" target="_blank" class="font-medium text-white p-7">github</a>
            </nav>

            <p class="py-10 text-center text-gray-300">© 2024 P4ver | All Rights Reserved</p>
          </div>

        </div>
    );
}

export default Footer;