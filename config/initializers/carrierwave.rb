require 'carrierwave/storage/fog'
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
CarrierWave.configure do |config|
  if Rails.env.development? || Rails.env.test?
    config.storage :file
  else
    config.fog_provider = 'fog/aws'
    config.storage = :fog
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id:     Settings.aws.access_key_id,
      aws_secret_access_key: Settings.aws.secret_access_key,
      region:                Settings.aws.s3_bucket_region,
    }
    config.fog_directory = Settings.aws.s3_bucket_name
  end
end
