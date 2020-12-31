import selenium, unittest, time
from selenium import webdriver

class LoginTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.base_url = "https://your-company.com/login"
        self.driver.implicitly_wait(15)

    def test_login(self):
        driver = self.driver
        driver.get(self.base_url)
        driver.find_element_by_id("username").clear()
        driver.find_element_by_id("username").send_keys("test-user1")
        driver.find_element_by_name("plaintext_password").clear()
        driver.find_element_by_name("plaintext_password").send_keys("test-password1")
        driver.find_element_by_css_selector("a.loginButton").click()
        element = driver.find_element_by_css_selector("login-box")
        self.assertEqual(element.text, "Login Successful!")

    def tearDown(self):
        self.driver.quit()
